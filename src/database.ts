export interface Task {
    id: string;
    title: string;
    description: string;
    completed_at: Date | null;
    created_at: Date;
    updated_at: Date;
}

export class Database {
    private tasks: Task[] = [];

    public select(search?: string): Task[] {
        if (search) {
            const query = search.toLowerCase();
            return this.tasks.filter(
                (task) =>
                    task.title.toLowerCase().includes(query) ||
                    task.description.toLowerCase().includes(query)
            );
        }
        return this.tasks;
    }

    public findById(id: string): Task | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    public insert(task: Task): Task {
        this.tasks.push(task);
        return task;
    }

    public update(id: string, title?: string, description?: string): Task | null {
        const task = this.findById(id);

        if (!task) return null;

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        task.updated_at = new Date();

        return task;
    }

    public toggleComplete(id: string): Task | null {
        const task = this.findById(id);

        if (!task) return null;

        const isCompleted = task.completed_at !== null;

        task.completed_at = isCompleted ? null : new Date();
        task.updated_at = new Date();

        return task;
    }

    public delete(id: string): boolean {
        const index = this.tasks.findIndex((task) => task.id === id);

        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }
}
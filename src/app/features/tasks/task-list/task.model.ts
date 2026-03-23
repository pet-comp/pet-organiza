export interface Category {
    id: string;
    name: string;
    icon: string;
    colorHue: number;
}

export interface Task {
    id: string;
    name: string;
    completed: boolean;
    categoryID: string;
}
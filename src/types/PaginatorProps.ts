export interface PaginatorProps {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

// export interface PaginatorProps {
//   meta: {
//     current_page: number;
//     from: number;
//     last_page: number;
//     links: PaginatorLink[];
//     path: string;
//     per_page: number;
//     to: number;
//     total: number;
//   }
// }

// export interface PaginatorLink {
//   url: string | null;
//   label: string;
//   active: boolean;
// }
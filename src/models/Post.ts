export default interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

export default interface PostComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
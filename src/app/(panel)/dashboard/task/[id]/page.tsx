import Playground from "./ui/Playground";

export default async function TaskIdPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <div>
            <h1>Task ID</h1>
            <Playground />
        </div>
    );
}
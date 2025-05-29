import LoginForm from "./ui/LoginForm";

export default function LoginPage() {
    return (
        <div className="w-screen h-screen p-8 flex items-start justify-center">
            <div className="flex h-full w-full items-center justify-center">
                <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
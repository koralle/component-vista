import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const onClick = async () => {};

  return (
    <div>
      <button type="button" onClick={onClick}>
        Sign In
      </button>
    </div>
  );
}

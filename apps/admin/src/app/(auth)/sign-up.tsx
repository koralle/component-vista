import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-up")({ component: RouteComponent });

function RouteComponent() {
  const onClick = async () => {};

  return (
    <button type="button" onClick={onClick}>
      Sign Up
    </button>
  );
}

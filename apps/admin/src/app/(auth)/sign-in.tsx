import { Button } from "@component-vista/admin-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const onClick = async () => {};

  return (
    <div>
      <Button type="button" onClick={onClick}>
        Sign In
      </Button>
    </div>
  );
}

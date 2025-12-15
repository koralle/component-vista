import { Button } from "@component-vista/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-up")({ component: RouteComponent });

function RouteComponent() {
  const onClick = async () => {};

  return <Button onClick={onClick}>Sign Up</Button>;
}

{
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixpkgs-unstable";
    };

    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };

    systems = {
      url = "github:nix-systems/default";
    };
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      systems,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import systems;

      perSystem =
        {
          config,
          system,
          pkgs,
          ...
        }:
        {
          formatter = pkgs.nixfmt-tree;

          devShells = {
            default = pkgs.mkShell {
              packages = with pkgs; [
                # Bun
                # https://github.com/oven-sh/bun
                bun

                # Taplo
                # https://github.com/tamasfe/taplo
                taplo
              ];
            };
          };
        };
    };
}

# create-rust
![version](https://img.shields.io/npm/v/create-rust)
![license](https://img.shields.io/npm/l/create-rust)
![npm total downloads](https://img.shields.io/npm/dt/create-rust.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/liruifengv/create-rust/pulls)

An easy way to create a Rust project.
## Usage

```
npm init rust
```

Or, you can carry arg on the command line:
```
npm init rust your-project-name
```

## features
- .vscode/settings.json: 
vscode can formatting on save if you installed rust-analyzer extension.
- .vscode/launch.json: 
you can debug rust in vscode.
- .github/workflows: 
use github action，it will run cargo fmt/clippy/test when push/pr.
- .rustfmt.toml

## License

create-rust is released under the MIT License. See the bundled
[LICENSE](./LICENSE) file for details.

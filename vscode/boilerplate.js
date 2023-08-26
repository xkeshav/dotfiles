const fs = require("fs");

const args = process.argv.slice(2);
console.log({ args });

const name = args[0].trim();

const createFiles = (name) => {
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>${name}</title>
	<style>
		.container {
			display:grid;
			height: 100vh;
			background-color: grey;
		}
	</style>
</head>
<body class="container">
	<header class="header"> </header>
	<main class="main"> </main>
	<footer class="footer"> </footer>
</body>
</html>
`;

  fs.writeFile(`${name}/index.html`, content, (err) => {
    if (err) throw err;
    console.log("HTML file created!");
  });
};

if (!fs.existsSync(name)) {
  fs.mkdirSync(name, { recursive: true });
  createFiles(name);
}

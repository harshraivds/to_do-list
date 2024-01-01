import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const items = [];
const workitems = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	const today = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	const day = today.toLocaleDateString("en-US", options);

	res.render("index", {
		listtitle: day,
		newListItems: items,
	});
});

app.post("/", (req, res) => {
	const item = req.body.newItem;
	if (req.body.list === "Work") {
		workitems.push(item);
		res.redirect("/work");
	}else {
		items.push(item);
		res.redirect("/");
	}
});
app.get("/work", (req,res)=>{
	res.render("index", {
		listtitle: "Work List",
		newListItems: workitems
	});
});
app.post("/work", (req, res)=>{
	const item = req.body.newItem;
	workitems.push(item);
	res.redirect("/work");
});
app.get("/work",(req, res) =>{
  res.render("work.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

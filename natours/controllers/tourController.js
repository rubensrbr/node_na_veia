const fs = require("fs");

// FileReading, api route and parsing data
const fileToRead = require("path").resolve(
  __dirname,
  "../dev-data/data/tours.json",
);

const tours = JSON.parse(fs.readFileSync(fileToRead, "utf-8"));

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
  next();
};

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(fileToRead, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour,
      },
    });
  });
};

exports.updateTour = (req, res) => {
  rest.status(200).json({
    status: "sucess",
    data: {
      tour: "<Updated tour here...>",
    },
  });
};
exports.deleteTour = (req, res) => {
  rest.status(204).json({
    status: "sucess",
    data: null,
  });
};

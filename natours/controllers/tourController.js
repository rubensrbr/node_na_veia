const fs = require("fs");

// FileReading, api route and parsing data
const fileToRead = require("path").resolve(
  __dirname,
  "../dev-data/data/tours.json",
);

const tours = JSON.parse(fs.readFileSync(fileToRead, "utf-8"));

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
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
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);
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

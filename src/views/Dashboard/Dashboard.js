import React, { useEffect, useState } from "react";
import { Statistic, Col } from "antd";
import { Line as LineA } from "react-chartjs-2";
import {LineChart,Line,CartesianGrid,PieChart,Pie,Cell,RadialBarChart,RadialBar,Legend,} from "recharts";
import car1 from "../../assets/img/card/car1.png";
import delivery1 from "../../assets/img/card/delivery1.png";
import parking1 from "../../assets/img/card/parking1.png";
import vip1 from "../../assets/img/card/vip1.png";
import price from "../../assets/img/icon/price.png";
import car from "../../assets/img/icon/car.png";
import parking from "../../assets/img/icon/parking.png";
import { Card, CardBody, Row } from "reactstrap";
import "./card.css";
import "./chart.css";
import axios from "axios";
import {CardActions,CardContent,Button,Divider,Table,TableBody,TableCell,TableRow,} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PerfectScrollbar from 'react-perfect-scrollbar';

var moment = require("moment"); 
const time = moment().format("DD MMMM YYYY");

const data2 = [
  { name: "Group A", value: 45 },
  { name: "Group B", value: 300 },
];
const data3 = [
  { name: "car",        uv: 31.47,pv: 2400,fill: "#20A8D8"},
  { name: "Car parking",uv: 26.69,pv: 4567,fill: "#FFC107"},
  { name: "Car VIP",    uv: 15.69,pv: 1398,fill: "#F86C6B"},
];
const style = {top: 15,left: 250,lineHeight: "24px",};
const COLORS = ["#63C2DE", "#20A8D8"];
const data4 = {
  labels: ["10.00", "10.30", "11.30", "12.00", "12.02", "12.20"],
  datasets: [
    {
      label: "Incoming",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Outgoing",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

const Dashboard = () => {
  const [dashboard, setDashboard] = useState([{}]);
  const [realtime, setRealtime] = useState([]);
  const [data, setData] = useState([]);
  const [graph, setGraph] = useState([{}])
  useEffect(() => {
    getDashboard();
  }, []);
  const getDashboard = async () => {
    let dashboard = await axios.get("http://localhost:8000/dashboard/getDashboard");
    setDashboard(dashboard.data);
    let realtime = await axios.get("http://localhost:8000/dashboard/getRealtime");
    setRealtime(realtime.data);
    let data = await axios.get("http://localhost:8000/dashboard/getData");
    setData(data.data);
    let graph = await axios.get("http://localhost:8000/dashboard/getGraph")
    setGraph(graph.data)
  };
  console.log("dashboard", dashboard);
  console.log("realtime", realtime);
  console.log("data", data);
  console.log("graph",graph);
  const datagraph = []
  graph.forEach(deta => {
    const newData = {}
    newData.name = deta.date;
    newData.number = deta.totalCars
    datagraph.push(newData)
    console.log("test1",newData);
  })

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12" sm="6" lg="2" md="6" xl="4">
          <Card className="text-white bg-primary" id="card">
            <img src={car1} alt="logocar" className="absolute" />
            <CardBody className="pb-0">
              <img src={car1} alt="logocar" className="logo1" />
              <span className="textcard1">Number of cars</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              <h4 className="number">{dashboard[0].totalCars}</h4>
            </div>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="6" md="6" xl="4">
          <Card className="text-white bg-info" id="card">
            <img src={parking1} alt="logoparking" className="absolute" />
            <CardBody className="pb-0">
              <img src={parking1} alt="logoparking" className="logo2" />
              <span className="textcard2">Car Parking</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              <h4 className="number">{dashboard[0].carParking}</h4>
            </div>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="6" md="6" xl="4">
          <Card className="text-white bg-warning" id="card">
            <img src={delivery1} alt="logodelivery" className="absolute" />
            <CardBody className="pb-0">
              <img src={delivery1} alt="logodelivery" className="logo3" />
              <span className="textcard3">Delivery Parking</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              <h4 className="number">{dashboard[0].deliveryParking}</h4>
            </div>
          </Card>
        </Col>
        <Col xs="12" sm="6" lg="6" md="6" xl="4">
          <Card className="text-white bg-danger" id="card">
            <img src={vip1} alt="logovip" className="absolute" />
            <CardBody className="pb-0">
              <img src={vip1} alt="logovip" className="logo4" />
              <span className="textcard4">Car VIP</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: "70px" }}>
              <h4 className="number">{dashboard[0].carVIP}</h4>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Row>
            <Card id="chrat1">
              <CardBody className="pb-0">
                <h4>Statiscs</h4>
                <Statistic value={data.length} className="satistic" />
                <div className="price">
                  <img src={price} alt="logo" className="price" />
                  <text>{dashboard[0].totalCars}</text>
                  <text>({dashboard[0].totalCars})</text>
                </div>
                <LineChart width={900} height={200} data={datagraph}>
                  <Line dataKey="number" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />

                </LineChart>
              </CardBody>
            </Card>
          </Row>
          <Row>
            <Col>
              <Card className="chart4">
                <CardBody className="pb-0">
                  <div>
                    <RadialBarChart
                      width={500}
                      height={300}
                      cx={140}
                      cy={70}
                      innerRadius={20}
                      outerRadius={70}
                      barSize={10}
                      data={data3}
                    >
                      <RadialBar
                        minAngle={15}
                        label={{ position: "insideStart", fill: "#fff" }}
                        background
                        clockWise
                        dataKey="uv"
                      />
                      <Legend
                        iconSize={10}
                        width={120}
                        height={140}
                        layout="vertical"
                        verticalAlign="middle"
                        wrapperStyle={style}
                      />
                    </RadialBarChart>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="chart4">
                <CardBody className="pb-0">
                  <div className="chartline">
                    <LineA data={data4} width={400} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card id="chrat2">
            <CardBody className="pb-0">
              <h3>Real time</h3>
              <h6>{time}</h6>
              <div className="move">
                <text>Movement</text>
                <div>
                  <img src={car} alt="logo" className="rtcar" />
                  <text id="car">{dashboard[0].totalCars}</text>
                </div>
                <div>
                  <img src={parking} alt="logo" className="rtpark" />
                  <text id="car">{dashboard[0].carParking}</text>
                </div>
              </div>
             
              <PieChart width={250} height={200}>
                <Pie
                  data={data2}
                  cx={120}
                  cy={95}
                  innerRadius={60}
                  outerRadius={70}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </CardBody> 
            <CardContent>
              <PerfectScrollbar>
               
                  <Table>
                    <TableBody>
                      {realtime.slice(0,3).map(realtime => (
                        <TableRow
                          hover
                          key={realtime.id}
                        >
                          <TableCell>{realtime.numberOfcars}</TableCell>
                          <TableCell>{realtime.numberOfcars}</TableCell>
                          <TableCell>
                            {moment(realtime.time).format('hh:mm:ss')}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
               
              </PerfectScrollbar>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                size="small"
                variant="text"
              >
                View all <ArrowRightIcon />
              </Button>
            </CardActions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

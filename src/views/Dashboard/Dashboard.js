import React, { PureComponent, useEffect, useState } from 'react';
import { Statistic, Col, Button } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, PieChart, Pie, Sector, Cell, } from 'recharts';
import car1 from '../../assets/img/card/car1.png'
import delivery1 from '../../assets/img/card/delivery1.png'
import parking1 from '../../assets/img/card/parking1.png'
import vip1 from '../../assets/img/card/vip1.png'
import car2 from '../../assets/img/card/car2.png'
import delivery2 from '../../assets/img/card/delivery2.png'
import parking2 from '../../assets/img/card/parking2.png'
import vip2 from '../../assets/img/card/vip2.png'
import price from '../../assets/img/icon/price.png'
import car from '../../assets/img/icon/car.png'
import parking from '../../assets/img/icon/parking.png'
import {
  Card,
  CardBody,
  Row,
  CardColumns
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import './card.css';
import './chart.css';
import axios from 'axios'
var moment = require('moment'); // require
const time = moment().format('DD MMMM YYYY');
//statisce



//realtime
const data2 = [
  { name: 'Group A', value: 45 },
  { name: 'Group B', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F'];
const Dashboard = () => {
  const [cars, setCars] = useState([{}])
  const [dashboard, setDashboard] = useState([{}])
  const [realtime, setRealtime] = useState([{}])
  const [graph, setGraph] = useState([{}])

  const getData = async () => {
    const data = await axios.get(`http://127.0.0.1:8000/dashboard/getData`)
    setCars(data.data)
    const dash = await axios.get(`http://127.0.0.1:8000/dashboard/getDashboard`)
    setDashboard(dash.data)
    const realtime = await axios.get(`http://127.0.0.1:8000/dashboard/getRealtime`)
    setRealtime(realtime.data)
    const graph = await axios.get(`http://127.0.0.1:8000/dashboard/getGraph`)
    setGraph(graph.data)
  }

  useEffect(() => {
    getData()
  }, [])
  const data = []
  graph.forEach(deta => {
    const newData = {}
    newData.name = deta.date;
    newData.number = deta.totalCars
    data.push(newData)
  })

  console.log('cars: ', cars)
  console.log('dashboard: ', moment(dashboard[0].newDate).format()) //ดึงเวลาให้ใช้แบบนี้
  console.log('realtime: ', realtime)
  console.log('graph: ', graph)


  return (
    <div className="animated fadeIn">

      {/* //การ์ด */}
      <Row>

        <Col xs="12" sm="6" lg="4" md="6" >
          <Card className="text-white bg-info" id="card">
            <img src={car2} className="absolute" />
            <CardBody className="pb-0">
              <img src={car1} className="logo1" />

              <span className="textcard1">Number of cars</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <h4 className="number">{dashboard[0].totalCars}</h4>
            </div>
          </Card>
        </Col>



        <Col xs="12" sm="6" lg="4" md="6">
          <Card className="text-white bg-primary" id="card">
            <img src={parking2} className="absolute" />
            <CardBody className="pb-0">
              <img src={parking1} className="logo2" />
              <span className="textcard2">Car Parking</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <h4 className="number">{dashboard[0].carParking}</h4>
            </div>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4" md="6">
          <Card className="text-white bg-warning" id="card">
            <img src={delivery2} className="absolute" />
            <CardBody className="pb-0">
              <img src={delivery1} className="logo3" />
              <span className="textcard3">Delivery Parking</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <h4 className="number">{dashboard[0].deliveryParking}</h4>
            </div>
          </Card>
        </Col>


        <Col xs="12" sm="6" lg="4" md="6">
          <Card className="text-white bg-danger" id="card">
            <img src={vip2} className="absolute" />
            <CardBody className="pb-0">
              <img src={vip1} className="logo4" />

              <span className="textcard4">Car VIP</span>
            </CardBody>
            <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              <h4 className="number">{dashboard[0].carVIP}</h4>
            </div>
          </Card>
        </Col>

      </Row>

      {/* กราฟ */}
      <Row>
        <Col xs="12" sm="6" lg="4" md="6" >
          <Card id="chrat1">

            <CardBody className="pb-0">
              <h4>Statiscs</h4>
              <Statistic value={cars.length} className="satistic" />
              <div className="price">
                <img src={price} className="price" />
              </div>
              <LineChart width={900} height={200} data={data} className="ss">
                <Line type="monotone" dataKey="number" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                {/* <XAxis dataKey="time" />
                    <YAxis dataKey="number" /> */}
              </LineChart>
            </CardBody>
          </Card>
        </Col>

        <Col xs="12" sm="6" lg="4" md="6" >
          <Card id="chrat2">

            <CardBody className="pb-0">
              <h5>Real time</h5>
              <small>{time}</small>
              <div className="move">
                <spen >Movement</spen>
                <div>
                  <img src={car} className="rtcar" />
                  <spen id="car" >{data2[0].value}</spen>
                </div>
                <div>
                  <img src={parking} className="rtpark" />
                  <spen id="car">{data2[1].value}</spen>
                </div>


              </div>

              <PieChart width={700} height={900} >

                <Pie
                  data={data2}
                  cx={120}
                  cy={200}
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
          </Card>
        </Col>


        <Row>
          <Col xs="12" sm="6" lg="4" md="6" >
            <Card >

              <CardBody className="pb-0">
                <h4>Statiscs</h4>
                <Statistic value={1893} />
                <div className="price">
                  <img src={price} className="price" />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="4" md="6" >
            <Card >

              <CardBody className="pb-0">
                <h4>Statiscs</h4>
                <Statistic value={1893} />
                <div className="price">
                  <img src={price} className="price" />
                </div>
              </CardBody>
            </Card>
          </Col>



        </Row>



        {/* <Col xs="12" sm="6" lg="4" md="6">
          <Card className="text-white bg-primary" id="card">
          </Card>
        </Col>
        <Col>
        <div className="animated fadeIn">
          <CardColumns className="cols-2">
            <Card id="frame">
              <CardBody>
                <h4>Statiscs</h4>
                <Statistic value={1893} className="satistic" />
                <div className="price">
                  <img src={price} className="price" />
                  <spen  >{data[5].number}</spen>
                  <spen>({data[4].number})</spen>
                </div>



                <div className="chart-wrapper" >
                  <LineChart width={400} height={200} data={data}>
                    <Line type="monotone" dataKey="number" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    {/* <XAxis dataKey="time" />
                    <YAxis dataKey="number" /> */}
        {/* </LineChart>
                </div>
              </CardBody>
            </Card>
          </CardColumns>
        </div>
        </Col> */}

        {/* <Col>
        <div className="animated fadeIn">
          <CardColumns className="cols-2">
            <Card id="frame">
              <CardBody>
                <h5>Real time</h5>
                <small>{time}</small>
                <PieChart width={300} height={400} >

                  <Pie
                    data={data2}
                    cx={120}
                    cy={200}
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
            </Card>
          </CardColumns>
        </div>         
        </Col> */}



      </Row>





    </div>
  );

}

export default Dashboard;

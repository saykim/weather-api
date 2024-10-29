import express from "express";
import axios from "axios";

const app = express();
const port = 3001; // 3000번 포트가 사용 중이면 3001 사용

app.get("/weather", async (req: any, res: any) => {
  try {
    const { serviceKey, numOfRows, pageNo, base_date, base_time, nx, ny } = req.query;

    const api_url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst";
    
    const response = await axios.get(api_url, {
      params: {
        serviceKey,
        numOfRows,
        pageNo,
        base_date,
        base_time,
        nx,
        ny
      },
      responseType: 'arraybuffer' // XML 응답을 위해 필요
    });

    if (response.status === 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(response.data);
    } else {
      res.status(response.status).end();
      console.log("error =", response.status);
    }
  } catch (error: any) {
    console.error("Error fetching weather data:", error.message);
    res.status(error.response?.status || 500).end();
  }
});

app.listen(port, () => {
  console.log(
    `Weather API server running at http://127.0.0.1:${port}/weather?serviceKey=DCcTIjCOutB0mKohyWsrtgFlzvsYLE9m4G046MuChFdj2cIWBVdm94yaywmzCF8J015RCaUPBmXUwYxlbKXjYA%3D%3D&numOfRows=10&pageNo=1&base_date=20241029&base_time=0600&nx=61&ny=125`
  );
});
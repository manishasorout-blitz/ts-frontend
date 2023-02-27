import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, DateRangePicker } from "rsuite";
import style from "./home.module.scss";
import "../.././styles.css";

const cx = classNames.bind(style);

type Bill = {
  _id: string;
  title: string;
  expense_date: string;
  amount: number;
};
const Home = (): JSX.Element => {
  const [data, setdata] = useState([]);
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const [disablepage, setdisablepage] = useState(1);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: new Date("2022-02-01 "),
    endDate: new Date("2022-05-01 "),
  });
  const startdate = new Date(
    dateRange.startDate.getTime() -
      dateRange.startDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 10)
    .toString();
  const enddate = new Date(
    dateRange.endDate.getTime() - dateRange.endDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .substring(0, 10)
    .toString();
  useEffect(() => {
    getdata();
  }, [page]);

  //function to get all the bills
  const getdata = async () => {
    try {
      var res1 = await fetch(
        `http://localhost:3001/api/v1/platform/bill/allbills?page=${page}&pageSize=5`,
        {
          headers: {
            token: localStorage.getItem("token2"),
          },
        }
      );
      var res2 = await res1.json();
      setdisablepage(res2.count);

      setdata(res2.allbills);
    } catch (error) {
      console.log(error);
    }
  };

  //function to delete the bill
  async function handleDelete(id: string | number) {
    try {
      var res1 = await fetch(
        `http://localhost:3001/api/v1/platform/bill/deletebill/${id}`,
        {
          method: "DELETE",
        }
      );
      var res2 = await res1.json();
      await getdata();
    } catch (error) {
      console.log(error);
    }
  }

  //function for pagination
  function handleprev() {
    setpage((prev) => prev - 1);
  }
  function handlenext() {
    setpage((prev) => prev + 1);
  }

  //for search with date range
  async function handleSearch() {
    console.log("searchhhh");
    try {
      var res1 = await fetch(
        `http://localhost:3001/api/v1/platform/bill/allbills?page=${page}&pageSize=5&search=${search}&startDate=${startdate}&endDate=${enddate}`,
        {
          headers: {
            token: localStorage.getItem("token2"),
          },
        }
      );
      var res2 = await res1.json();
      setdata(res2.allbills);
    } catch (error) {
      console.log(error);
    }
  }
  //to select the value of date range
  function handleDateRangeChange(value: [Date, Date]) {
    setDateRange({
      startDate: value[0],
      endDate: value[1],
    });
  }
  return (
    <>
      <div>
        <div className={cx("date_picker")}>
          <input
            className={cx("Input")}
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="....search"
          />
          <div className="field">
            <DateRangePicker
              className={cx("date_range_inp")}
              format="yyyy-MM-dd"
              onChange={handleDateRangeChange}
              defaultCalendarValue={[
                new Date("2023-02-01 00:00:00"),
                new Date("2023-05-01 23:59:59"),
              ]}
            />

            <Button
              className={cx("button")}
              appearance="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
        <div className={cx("newbox")}>
          <div className={cx("child_div")}>
            <div>Title</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Delete</div>
            <div>Edit</div>
          </div>
          {data.map((e) => {
            return (
              <div className={cx("data_div")}>
                <div>{e.title}</div>
                <div>₹ {e.amount}</div>
                <div>
                  {new Date(e.expense_date)
                    .toISOString()
                    .substring(0, 10)
                    .toString()}
                </div>
                <div>
                  <Button
                    appearance="primary"
                    className={cx("Button")}
                    onClick={() => handleDelete(e._id)}
                  >
                    Delete
                  </Button>
                </div>
                <div>
                  <Link to={`/edit/${e._id}`}>
                    <Button appearance="primary" className={cx("Button")}>
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("paginate")}>
          <Button
            disabled={page === 1}
            appearance="primary"
            onClick={handleprev}
          >
            prev
          </Button>
          <br />
          <div>
            <h5>{page}</h5>
          </div>
          <br />
          <Button
            onClick={handlenext}
            disabled={disablepage / page <= 5}
            appearance="primary"
          >
            next
          </Button>
        </div>
      </div>
    </>
  );
};
export default Home;

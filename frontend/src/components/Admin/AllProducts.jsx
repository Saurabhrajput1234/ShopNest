import { Button, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

const server = process.env.REACT_APP_ENDPOINT_API;

const AllProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setData(res.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "Stock", headerName: "Stock", type: "number", minWidth: 80, flex: 0.5 },
    { field: "sold", headerName: "Sold out", type: "number", minWidth: 130, flex: 0.6 },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  const rows = data.map((item) => ({
    id: item._id,
    name: item.name,
    price: "US$ " + item.discountPrice,
    Stock: item.stock,
    sold: item?.sold_out,
  }));

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      {loading ? (
        <div className="grid grid-cols-2 gap-4 p-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg shadow">
              <Skeleton variant="rectangular" width="100%" height={100} />
              <Skeleton variant="text" sx={{ mt: 2, width: "80%" }} />
              <Skeleton variant="text" sx={{ width: "60%" }} />
            </div>
          ))}
        </div>
      ) : (
        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
      )}
    </div>
  );
};

export default AllProducts;

import { Box, useMediaQuery } from "@mui/material";
import { useGetProductsQuery } from "../store/api";
import Product from "./Product";
import { AllProductsData } from "../types/types";
import Header from "../components/Header";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery("");

  const isNonMobile = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(({ product, stat }: AllProductsData) => (
            <Product
              key={product._id}
              _id={product._id}
              name={product.name}
              description={product.description}
              price={product.price}
              rating={product.rating}
              category={product.category}
              supply={product.supply}
              stat={stat}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;

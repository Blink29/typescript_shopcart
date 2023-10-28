import { useContext } from "react";
import ProductsContext, { UseProductContextType } from "../context/ProdectProvider";

const useProduct = (): UseProductContextType => {
    return useContext(ProductsContext)
}

export default useProduct
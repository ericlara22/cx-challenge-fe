import { Product } from "@/types/product";
import Image from "next/image";

export default function ProductCard({ product }: {product: Product}) {
  const { price, title, thumbnail, installments } = product;
  const installmentsMsg = installments
    ? `En ${installments.quantity} cuotas de ${installments.amount}`
    : "";

  return (
    <div className="flex my-3 border-b-2 border-gray-100 pb-3">
      <div className="w-1/3 lg:w-1/4 xl:w-1/5 justify-center grid pl-2">
        <Image
          src={thumbnail}
          alt={title}
          width={100}
          height={100}
          className="w-auto h-full"
        />
      </div>
      <div className="w-2/3 lg:w-3/4 xl:w-4/5 p-4 space-y-1">
        <h2 className="text-gray-500 max-w-lg">{title}</h2>
        <p className="text-lg">$ {price}</p>
        <p className="text-green-600 text-xs">{installmentsMsg}</p>
      </div>
      <hr />
    </div>
  );
}

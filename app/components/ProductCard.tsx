// components/ProductCard.tsx
import Image from "next/image";

export default function ProductCard({ product }: any) {
  const { price, title, thumbnail, location, installments } = product;
  const installmentsMsg = installments
    ? `En ${installments.quantity} cuotas de ${installments.amount}`
    : "";

  return (
    <div className="flex my-3 border-b-2 border-gray-100 pb-3">
      <div className="w-40 justify-center flex pl-2">
        <Image
          src={thumbnail}
          alt={title}
          width={100}
          height={100}
          className="w-auto h-full"
        />
      </div>
      <div className="w-3/5 p-4 space-y-1">
        <p className="text-gray-500">{title}</p>
        <h2 className="text-lg">$ {price}</h2>
        <p className="text-green-600 text-xs">{installmentsMsg}</p>
      </div>
      <hr />
    </div>
  );
}

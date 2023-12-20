// components/ProductCard.tsx
import Image from "next/image";

export default function ProductCard({ product }: any) {
  console.log(product);
  const { price, title, thumbnail, location, installments } = product;
  const installmentsMsg = installments
    ? `En ${installments.quantity} cuotas de ${installments.amount}`
    : "";

  return (
    <div className="flex my-3 border-b-2 border-gray-100 pb-3 mx-5">
      <div className="w-1/5 justify-center flex">
        <Image src={thumbnail} alt={title} width={120} height={120} />
      </div>
      <div className="w-1/2 p-4 grid">
        <h2 className="text-lg">$ {price}</h2>
        <p>{title}</p>
        <p className="text-green-600">{installmentsMsg}</p>
      </div>
      <div className="w-1/3 p-4 text-right">
        <p>{location}</p>
      </div>
      <hr />
    </div>
  );
}

// components/PriceFilter.tsx
import { useState } from 'react'

export default function PriceFilter({ filter }: any) {
  const [selectedValue, setSelectedValue] = useState('')

  const handleValueChange = (event: any) => {
    setSelectedValue(event.target.value)
    // You can add code here to filter your products based on the selected value
  }

  return (
    <div className="flex flex-col items-start space-y-2">
      <label htmlFor={filter.id} className="font-bold">{filter.name}</label>
      {filter.values.map((value: any, index: number) => (
        <div key={index}>
          <input
            type="radio"
            id={value.id}
            name={filter.id}
            value={value.id}
            checked={selectedValue === value.id}
            onChange={handleValueChange}
          />
          <label htmlFor={value.id} className="ml-2">{value.name}</label>
        </div>
      ))}
    </div>
  )
}
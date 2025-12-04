import React from 'react';
import { StockItem, ItemUpdateField } from '../types';
import { CURRENCY_SYMBOL } from '../constants';

interface StockRowProps {
  item: StockItem;
  onUpdate: (id: string, field: ItemUpdateField, value: number) => void;
}

export const StockRow: React.FC<StockRowProps> = ({ item, onUpdate }) => {
  const totalStock = item.opening + item.added;
  const availableStock = totalStock - item.damaged;
  // Logic: Sales = (Opening + Added) - Damaged - Closing
  const salesMade = Math.max(0, availableStock - item.closing);
  const amount = salesMade * item.price;

  const handleChange = (field: ItemUpdateField, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value) || 0;
    // Allow negative closing if user forces it, but generally clamp inputs where logical
    onUpdate(item.id, field, val); 
  };

  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSales = parseInt(e.target.value) || 0;
    // If user inputs Sales, we calculate what Closing must be.
    // Closing = Available - Sales
    // We allow negative closing here so the user's sales input "sticks" even if it exceeds stock temporarily
    const newClosing = availableStock - newSales;
    onUpdate(item.id, 'closing', newClosing);
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-all border-b border-slate-100 last:border-0 group">
      <td className="py-6 px-4">
        <div className="flex items-center space-x-4">
          <div className="relative overflow-hidden rounded-xl shadow-sm w-16 h-16 flex-shrink-0">
             <img
                src={`https://loremflickr.com/150/150/${item.imageQuery}/all?lock=${item.id}`}
                alt={item.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
          </div>
          <div>
            <div className="font-bold text-slate-800 text-lg">{item.name}</div>
            <div className="text-sm text-slate-400 font-medium tracking-wide uppercase">{item.category}</div>
          </div>
        </div>
      </td>
      <td className="py-6 px-4 text-center">
        <input
            type="number"
            value={item.price}
            onChange={(e) => handleChange('price', e)}
            className="w-24 py-2 px-3 text-center border border-slate-600 rounded-lg bg-slate-800 text-white font-medium focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all shadow-sm"
        />
      </td>
      <td className="py-6 px-4 text-center">
        <input
          type="number"
          value={item.opening}
          onChange={(e) => handleChange('opening', e)}
          className="w-20 py-2 px-3 text-center border border-slate-200 rounded-lg bg-slate-50 text-slate-600 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
        />
      </td>
      <td className="py-6 px-4 text-center">
        <input
          type="number"
          value={item.added}
          onChange={(e) => handleChange('added', e)}
          className="w-20 py-2 px-3 text-center border border-slate-600 rounded-lg bg-slate-800 text-white font-medium focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all shadow-sm"
        />
      </td>
      <td className="py-6 px-4 text-center">
        <span className="inline-flex items-center justify-center w-12 h-8 rounded-md bg-slate-100 text-slate-500 font-semibold">
          {totalStock}
        </span>
      </td>
      <td className="py-6 px-4 text-center">
        <input
          type="number"
          value={item.damaged}
          onChange={(e) => handleChange('damaged', e)}
          className="w-20 py-2 px-3 text-center border border-red-100 rounded-lg text-red-600 font-medium bg-red-50/30 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
        />
      </td>
      <td className="py-6 px-4 text-center">
        <input
          type="number"
          value={item.closing}
          onChange={(e) => handleChange('closing', e)}
          className="w-20 py-2 px-3 text-center border border-slate-600 rounded-lg bg-slate-800 text-white font-medium focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all shadow-sm"
        />
      </td>
      <td className="py-6 px-4 text-center">
         <input
          type="number"
          value={salesMade}
          onChange={handleSalesChange}
          className="w-20 py-2 px-3 text-center border border-green-200 rounded-lg bg-green-50 text-green-700 font-bold focus:ring-2 focus:ring-green-500/50 focus:border-green-500 outline-none transition-all shadow-sm"
        />
      </td>
      <td className="py-6 px-4 text-right">
        <div className="font-bold text-slate-800 text-lg">
           {amount.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400 font-medium">{CURRENCY_SYMBOL}</div>
      </td>
    </tr>
  );
};
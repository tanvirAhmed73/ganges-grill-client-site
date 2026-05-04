/** Dhaka-area suggestions for demo search until Google Places is wired */

export type MockAddressSuggestion = {
  id: string;
  label: string;
  detail: string;
  area: string;
};

export const MOCK_DHAKA_ADDRESSES: MockAddressSuggestion[] = [
  {
    id: "gulshan-1",
    label: "Gulshan Avenue",
    detail: "House 42, Gulshan Avenue, Gulshan 1, Dhaka 1212",
    area: "Gulshan",
  },
  {
    id: "gulshan-2",
    label: "Gulshan 2 Circle",
    detail: "Road 90, Gulshan 2, Dhaka 1212",
    area: "Gulshan",
  },
  {
    id: "banani",
    label: "Banani Road 11",
    detail: "Plot 15, Block E, Banani, Dhaka 1213",
    area: "Banani",
  },
  {
    id: "bashundhara",
    label: "Bashundhara R/A",
    detail: "Block A, Bashundhara Residential Area, Dhaka 1229",
    area: "Bashundhara",
  },
  {
    id: "dhanmondi",
    label: "Dhanmondi 27",
    detail: "27 Mirpur Rd, Dhanmondi, Dhaka 1209",
    area: "Dhanmondi",
  },
  {
    id: "uttara",
    label: "Uttara Sector 7",
    detail: "House 12, Sector 7, Uttara, Dhaka 1230",
    area: "Uttara",
  },
  {
    id: "motijheel",
    label: "Motijheel C/A",
    detail: "Floor 4, Dilkusha Centre, Motijheel, Dhaka 1000",
    area: "Motijheel",
  },
];

export function filterMockAddresses(query: string): MockAddressSuggestion[] {
  const q = query.trim().toLowerCase();
  if (!q) return MOCK_DHAKA_ADDRESSES.slice(0, 6);
  return MOCK_DHAKA_ADDRESSES.filter(
    (a) =>
      a.label.toLowerCase().includes(q) ||
      a.detail.toLowerCase().includes(q) ||
      a.area.toLowerCase().includes(q)
  ).slice(0, 8);
}

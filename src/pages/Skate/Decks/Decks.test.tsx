// Decks.test.tsx
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Decks from "./Decks";
import sortReducer from "shared/api/sortSlice";
import sizeReducer from "store/sizeSlice";
import brandReducer from "shared/components/SelectBrand/brandSlice";
import colorReducer from "store/colorSlice";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

// Мокаем хук useDecksData
vi.mock("pages/Skate/Decks/useDecks", () => ({
  useDecksData: () => ({
    data: [
      { title: "Board A", newPrice: 100, img: "a.jpg", color: "red", size: "L", company: "BrandX" },
      { title: "Board B", newPrice: 200, img: "b.jpg", color: "blue", size: "M", company: "BrandY" },
    ],
  }),
}));

function renderWithAllProviders(ui: React.ReactNode) {
  const store = configureStore({
    reducer: {
      sort: sortReducer,
      size: sizeReducer,
      brand: brandReducer,
      color: colorReducer,
    },
  });

  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    </QueryClientProvider>
  );
}

describe("Decks component", () => {
  it("filters by color (click + select MenuItem)", async () => {
    const user = userEvent.setup();
    renderWithAllProviders(<Decks />);

    // Открываем селект цвета
    const colorSelect = screen.getByLabelText(/Цвет/i);
    await user.click(colorSelect);

    // Ждём появления выпадающего списка
    const listbox = await screen.findByRole("listbox");

    // Находим и кликаем по опции "red"
    const redOption = within(listbox).getByText((content) => content.trim().toLowerCase() === "red");
    await user.click(redOption);

    // Проверяем, что осталась только карточка с цветом "red"
    const articles = screen.getAllByRole("article");
    expect(articles).toHaveLength(1);
    expect(screen.getByText(/Board A/i)).toBeInTheDocument();
  });
});

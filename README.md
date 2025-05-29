<h1 align="center">World Ranks | FE Project #3</h1>

<p align="center"><img src="" width="70%"></p>

This responsive dashboard visualizes global country data from the REST Countries API, showing key metrics like population, area, region, and independence status. It supports multiple languages and allows users to interactively search, sort, and filter results. The app is built with a focus on i18n, accessibility, and efficient data fetching using Radix UI, react-i18next, and TanStack Query.

### <div align="center"><a href="https://nimus-oes.github.io/react-world-ranks/">Go to Live Demo</a></div>

<br />

## Table of Contents

- [Project Requirements](#project-requirements)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [Single Source Design](#single-source-design)
- [Type System](#type-system)
- [State Management](#state-management)
- [Multilingual Support](#multilingual-support)
- [Key Feature Implementations](#key-feature-implementations)
- [Resources](#resources)
- [Author](#author)

<br />

## Project Requirements

Project Requirements

- Users should be able to filter and sort the list of countries based on selected criteria.
- ✅ **Real-Time Data**: Retrieves the most up-to-date country information from the REST Countries API.
- ✅ **Search & Filter**: Supports combined queries using search terms, regions, membership status (e.g., UN member), and sorting options to refine results.
- ✅ **Localization**: Both the UI and country-specific content adapt to the user’s selected language.

<br />

## Tech Stack

- API: **REST Countries API**
- Type System: **TypeScript**
- UI Library: **React 19.0.0**
- Component Primitives: **Radix 1.4.1**
- Internationalization: **react-i18next 15.5.1**
- Server State Management: **TanStack Query 5.74.7**
- Build Tool: **Vite 6.2.0**
- Styling: **CSS Modules**
- Deployment: **GitHub Pages**

<br />

## Directory Structure

```bash
react-world-ranks
├─ public
│  └─ locales
│     ├─ en.json
│     └─ ko.json
└─ src
   ├─ App.tsx
   ├─ components
   │  ├─ CountryTable/
   │  ├─ FoundResults/
   │  ├─ Header/
   │  ├─ LanguageSelector/
   │  ├─ Main/
   │  ├─ Region/
   │  ├─ SearchBar/
   │  ├─ SortBy/
   │  └─ Status/
   ├─ constants.ts
   ├─ i18n.ts
   ├─ index.css
   ├─ index.tsx
   └─ types
      └─ models.ts
```

### Component Hierarchy

```jsx
<Header>         // Logo, hero image
<Main>           // 'filters' state, API communication
  ├─ <FoundResults>      // Number of countries found
  ├─ <LanguageSelector>  // Language switch button
  ├─ <SearchBar>         // Country search bar
  ├─ <SortBy>            // Sorter dropdown
  ├─ <Region>            // Region tags
  ├─ <Status>            // Status checkbox
  └─ <CountryTable>      // Filtered list of countries
```

<br />

## Single Source Design

This application defines all core data—such as regions, sort categories, and country status—using constants defined in the `constants.ts` file. Arrays like `REGIONS`, `SORT_CATEGORIES`, and `STATUS_OPTIONS` act as a single source of truth across the application. These constants are used for type declarations, building the filter UI, initializing state, and mapping translation keys for internationalization.

### Key Constants

- `API_BASE_URL`: The base endpoint for the REST Countries API

- `API_PARAMS`: Default parameters used in API requests

- `LANGUAGES`: Supported language codes for internationalization

- `COUNTRY_TABLE_HEADERS`: Column headers used in the country data table

- `REGIONS`: Available region options for filtering

- `SORT_CATEGORIES`: Criteria available for sorting country data

- `STATUS_OPTIONS`: Options for filtering by country status

<br />
<br />

## Type System

This project uses TypeScript to establish a strict and maintainable type system, ensuring type safety and developer productivity through autocomplete and compile-time checks. All custom types are defined in `/src/types/models.ts` and fall into the following categories:

<br />

### 1. Union Types Derived from Constants

These union types are derived directly from the constant arrays in `constants.ts`, ensuring consistent value usage throughout the codebase and enabling autocomplete support.

```tsx
export type AppLangType = (typeof LANGUAGES)[number]["lng"];
export type HeaderType = (typeof COUNTRY_TABLE_HEADERS)[number];
export type RegionType = (typeof REGIONS)[number];
export type SorterType = (typeof SORT_CATEGORIES)[number];
export type StatusType = (typeof STATUS_OPTIONS)[number];
```

<br />

### 2. API Response Types – Raw Data Model

The `Country` interface defines the structure of the data returned by the REST Countries API, enabling type-safe access to specific fields throughout the application.

```tsx
export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  independent: boolean;
  unMember: boolean;
  region: string;
  area: number;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  translations: Record<string, Record<string, string>>;
}
```

<br />

### 3. API Response Types – Localized Extension Model

The `LocalizedCountry` interface extends `Country` by adding localized fields for display purposes. This allows the application to present data in the user's language without modifying the original API structure.

```tsx
export interface LocalizedCountry extends Country {
  localizedName: string;
  localizedRegion: string;
  localizedPopulation: string;
  localizedArea: string;
}
```

<br />

### 4. State Types

The `Filter` interface defines the structure of the application's filter state, capturing user input for region, status, sorting, and search. Multi-select filters use boolean maps to track selected options.

```tsx
export interface Filter {
  region: Record<RegionType, boolean>;
  sorter: SorterType;
  status: Record<StatusType, boolean>;
  searchKey: string;
}
```

<br />

### 5. Component Prop Types

These interfaces specify the props exchanged between components, ensuring type-safe communication throughout the application. Most are composed using the custom types defined earlier.

```tsx
export interface CountryProp {
  countries: LocalizedCountry[];
}

export interface CountryFetchProp {
  countries: LocalizedCountry[];
  isPending: boolean;
  isError: boolean;
}

export interface FilterProp {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}
```

<br />
<br />

## State Management

The application's filtering logic is driven by a centralized `filters` state object, which holds all relevant values, including the search term, sort criteria, selected regions, and country statuses.

<br />

### Centralized State Structure

All filters are managed within a single state object rather than as separate states. This centralized approach ensures consistency, simplifies updates, and improves maintainability. Since multiple filter values are often applied together, combining them into one object makes it easier to apply filtering logic, trace state changes, and scale the system as new filters are introduced.

<br />

#### Filter State

```tsx
{
  region: {
    Americas: false,
    Antarctic: false,
    Africa: false,
    Asia: false,
    Europe: false,
    Oceania: false
  },
  sorter: "",
  status: {
    unMember: false,
    independent: false
  },
  searchKey: ""
}
```

- **Multi-select filters** like `region` and `status` are stored as boolean maps.
- **Single-select filters** such as `sorter` and `searchKey` are stored as strings.

<br />

### Declaring and Initializing State

#### Lifted State in `<Main>`

The `filters` state is declared in the `<Main>` component—the nearest common ancestor of all filter-related components—so it can be shared and updated across the UI.

```tsx
const [filters, setFilters] = useState<Filter>(createInitialFilters());
```

<br />

#### Dynamic Initialization with `createInitialFilters()`

The initial filter state is generated using the `createInitialFilters` helper function. This function dynamically constructs the object based on values defined in external constants, ensuring that updates to available filter options do not require manual changes throughout the code.

```tsx
export function createInitialFilters(): Filter {
  return {
    region: Object.fromEntries(
      REGIONS.map((region) => [region, false]),
    ) as Filter["region"],
    sorter: SORT_CATEGORIES[0],
    status: Object.fromEntries(
      STATUS_OPTIONS.map((status) => [status, false]),
    ) as Filter["status"],
    searchKey: "",
  };
}
```

<br />

### State Flow

The `filters` state is passed from `<Main>` to child components via props. Each component updates its corresponding part of the filter state, and `<Main>` uses the updated values to re-filter the country list.

```
<Main>         // Declares the 'filters' state and handles country filtering
 ├─ <SearchBar>  // Updates 'searchKey'
 ├─ <SortBy>     // Updates 'sorter'
 ├─ <Region>     // Updates 'region'
 └─ <Status>     // Updates 'status'
```

<br />
<br />

## Multilingual Support

This project implements internationalization using the react-i18next library and currently supports English and Korean.

<br />

### Why Internationalization Matters

Building with i18n in mind from the beginning helps avoid costly refactoring down the line. Without it, adding new languages later can introduce significant complexity. Even if multilingual support isn’t an immediate requirement, planning for it early brings several key advantages:

- ✅ Reduces localization time and costs
- ✅ Improves code maintainability
- ✅ Accelerates market expansion and regional adaptation

<br />

### How Multilingual Support Works in This App

1. When the app starts, it checks `localStorage` for a saved language preference. If none exists, the app defaults to English.

2. The corresponding language JSON file is loaded dynamically from the `/locales` directory.

3. Components access translated strings via the `useTranslation()` hook from react-i18next.

4. When a user selects a new language, `i18n.changeLanguage()` is called and the selection is persisted in `localStorage`.

5. The app reloads the relevant translation file and automatically re-renders all components that use `useTranslation()`.

<br />

### Internationalization Setup

The app initializes react-i18next using a dedicated configuration file (`i18n.ts`):

```tsx
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("appLanguage") || "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}.json",
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
```

- **Separation of Code and Translations**

  All translations are stored in JSON files (e.g., `en.json`, `ko.json`) within the `/locales` folder. Adding a new language only requires creating a new file with the same key structure.

- **Dynamic Language Loading**

  The `i18next-http-backend` plugin loads only the selected language file at runtime, reducing the initial bundle size and streamlining language management.

- **Persistent Language Selection**

  The selected language is stored in `localStorage` to maintain the user's preference across sessions.

- **Fallback Language**

  If a key is missing in the selected language, the app gracefully falls back to English (`fallbackLng: "en"`), ensuring a consistent and functional UI.

<br />
<br />

## Key Feature Implementations

### 💎 Fetching the Latest Country Data

This application retrieves up-to-date country data using the REST Countries API, with network state managed by TanStack Query. Since it relies on a public API, the implementation is optimized to minimize unnecessary requests while ensuring a smooth and responsive user experience.

<br />

#### How Data Fetching Works

1. A `fetchCountries` query function is defined in the `<Main>` component.

2. This function is passed to `useQuery()` from TanStack Query to handle the asynchronous API call.

3. The returned values—`data`, `isPending`, and `isError`—are passed as props to the `<CountryTable>` component.

4. `<CountryTable>` renders content based on the current request state:

   - Loading/Error: Displays loading or error messages.
   - Success: Displays a filtered and localized list of countries

<br />

#### Query Function Design

The `fetchCountries` function uses only the required fields, as defined in the `API_PARAMS` constant, to minimize the response payload. It also includes error handling to ensure predictable behavior:

```tsx
async function fetchCountries() {
  const queryParams = API_PARAMS.join(",");
  const response = await fetch(`${API_BASE_URL}/all?fields=${queryParams}`);
  if (!response.ok) {
    throw new Error("Failed to fetch country data.");
  }
  return response.json();
}
```

<br />

#### useQuery Configuration

```tsx
const { data, isPending, isError } = useQuery<Country[]>({
  queryKey: ["countries"],
  queryFn: fetchCountries,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  staleTime: Infinity,
});
```

- `staleTime: Infinity`: Marks the data as always fresh. The query will automatically not re-fetch unless the app is reloaded.

- `refetchOnWindowFocus: false`: Prevents re-fetching when the user returns to the app after switching tabs.

- `refetchOnReconnect: false`: Disables automatic re-fetching when the network connection is restored. Previously fetched data is retained.

<br />

### 💎 Implementing Region and Status Filters

The app allows users to filter countries by region and status through the `<Region>` and `<Status>` components. These components update a shared filters state, which is managed in the `<Main>` component.

Whenever a filter is toggled, the updated state is passed to a utility function (`src/Main/helpers/filters.ts`) that handles the actual filtering logic. This ensures that only countries matching the selected criteria are displayed.

<br />

#### How Filtering Works

1. Identify Active Filters

   The filtering function begins by extracting the selected region and status values—those marked `true` in the filters state. Only these active options are used to evaluate countries.

2. Handle No Selection Case

   If no filters are selected (i.e., all options are `false`), the function returns the original list of countries without applying any filters.

3. Apply Region and Status Filters

   When filters are active, the function evaluates each country against them:

   - Region Filter: Includes countries if their `region` matches one of the selected region values.
   - Status Filter: Includes countries if they have the selected `status` fields (e.g., `unMember`, `independent`) and those fields are `true`.

<br />

### 💎 Language-Aware Table Sorting

In multilingual applications, sorting content based on the selected language is essential for a consistent and intuitive user experience. For example, if the interface is set to Korean but country names are still sorted using English alphabetical order, it can feel disjointed and confusing.

To address this, the application implements language-aware sorting by localizing the data before it is sorted and displayed.

<br />

#### Localized Data Model

Sorting is performed on a `LocalizedCountry` type, which extends the base `Country` type from the REST Countries API by adding translated and formatted fields:

```tsx
interface LocalizedCountry {
  name: {
    common: string;
  };
  cca2: string;
  independent: boolean;
  unMember: boolean;
  region: string;
  area: number;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  translations: Record<string, Record<string, string>>;
  localizedName: string; // Translated country name
  localizedRegion: string; // Translated region name
  localizedPopulation: string; // Population, localized format
  localizedArea: string; // Area, localized format
}
```

These localized fields are populated after the initial API fetch using a helper function in `src/Main/helpers/localization.ts.`

<br />

#### Sorting Logic

After localization, the `LocalizedCountry[]` array is passed to `sortCountries()`, which sorts the data based on the active sort option:

```tsx
function sortCountries(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  return countries.sort((a, b) => {
    switch (filters.sorter) {
      case "population":
        return b.population - a.population;
      case "area":
        return b.area - a.area;
      case "name":
        return a.localizedName.localeCompare(b.localizedName);
      case "region":
        return a.localizedRegion.localeCompare(b.localizedRegion);
      default:
        return 0;
    }
  });
}
```

- For text-based sorting (name and region), the function uses `localeCompare()` on the translated values (`localizedName`, `localizedRegion`) to ensure language-aware sorting.

- For numeric sorting (population and area), raw numeric values are used for accuracy, while displaying the localized formats (`localizedPopulation`, `localizedArea`) in the UI.

<br />
<br />

## Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) by TypeScript Cheatsheets
- [What Is I18n? A Simple Definition of Internationalization](https://phrase.com/blog/posts/i18n-a-simple-definition/) by Phrase
- [A Guide to React Localization with i18next](https://phrase.com/blog/posts/localizing-react-apps-with-i18next/) by Phrase

<br />

## Author

- [GitHub](https://github.com/Nimus-oes)
- [Blog (English)](https://nimus.hashnode.dev/)
- [Blog (Korean)](https://velog.io/@nimus/posts)
- [Frontend Project Collection](https://github.com/Nimus-oes/frontend-project-collection)

<br />

This project is my solution to the World Ranks challenge from DevChallenges.

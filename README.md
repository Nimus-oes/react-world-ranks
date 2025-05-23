<h1 align="center">World Ranks | FE Project #3</h1>

<p align="center"><img src="" width="70%"></p>

This application is a responsive dashboard for exploring global country data using the REST Countries API. It displays key metrics—including population, area, region, and independence status—with support for multiple languages. Users can interactively search, sort, and filter the dataset to tailor the view to their needs. The app is built with a strong focus on internationalization (i18n), accessibility, and efficient data fetching, leveraging tools such as Radix UI, react-i18next, and TanStack Query.

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

- Users must be able to filter and sort the list of countries based on selected criteria.
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

This application centralizes all filter-related configuration—such as regions, sort categories, and country statuses—using constants defined in the constants.ts file. Arrays like REGIONS, SORT_CATEGORIES, and STATUS_OPTIONS act as a single source of truth across the application. These constants are used for type declarations, building the filter UI, initializing state, and mapping translation keys for internationalization.

By consolidating these values in one place, the codebase remains consistent, maintainable, and scalable. This approach reduces redundancy and simplifies future updates or additions to filter options.

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

This project uses TypeScript to establish a strict and maintainable type system, ensuring type safety and developer productivity through robust autocomplete and compile-time checks. All custom types are defined in `/src/types/models.ts` and fall into the following categories:

<br />

### 1. Union Types Derived from Constants

These union types are generated directly from constant arrays in constants.ts. This approach guarantees consistency throughout the codebase and enhances developer experience with intelligent autocompletion.

```tsx
export type AppLangType = (typeof LANGUAGES)[number]["lng"];
export type HeaderType = (typeof COUNTRY_TABLE_HEADERS)[number];
export type RegionType = (typeof REGIONS)[number];
export type SorterType = (typeof SORT_CATEGORIES)[number];
export type StatusType = (typeof STATUS_OPTIONS)[number];
```

<br />

### 2. API Response Types – Raw Data Model

The `Country` interface represents the structure of the response returned by the REST Countries API. It allows for safe access to specific data fields throughout the app.

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

The `LocalizedCountry` interface extends Country by adding localized fields for display purposes. This allows the app to present data in the user's language without modifying the original API structure.

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

The `Filter` interface defines the structure of the app’s filtering state. It captures user selections for region, status, sorting, and search input. Boolean maps are used for multi-select filters.

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

These interfaces define the props passed between components, promoting type-safe communication across the app. Most are composed using the custom types listed above.

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

The filtering logic in this application is powered by a centralized filters state object. This unified state holds all relevant filter values, including the search term, sort criteria, selected regions, and country statuses.

<br />

### Centralized State Structure

All filters are combined into a single state object rather than being managed independently. This approach promotes consistency, simplifies updates, and enhances maintainability. Since filter values often work in combination, a centralized structure ensures coordinated state updates and makes debugging and expansion easier.

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

### State Declaration and Initialization

#### Lifted State in `<Main>`

The filters state is declared in the `<Main>` component—the nearest common ancestor of all filter-related components—so it can be shared and updated across the UI.

```tsx
const [filters, setFilters] = useState<Filter>(createInitialFilters());
```

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

This unidirectional state flow ensures predictable behavior and clear data ownership throughout the component tree.

<br />
<br />

## Multilingual Support

This project implements internationalization using the react-i18next library and currently supports English and Korean.

<br />

### Why Internationalization Matters

Building for i18n from the start avoids expensive refactoring later. Without it, adding languages retroactively can introduce significant complexity. Even if multilingual support isn’t an immediate requirement, planning for it offers several advantages:

- ✅ Reduces localization time and costs
- ✅ Improves code maintainability
- ✅ Accelerates market expansion and regional adaptation

<br />

### How Multilingual Support Works in This App

1. On app startup, the user's saved language is retrieved from localStorage. If none exists, the app defaults to English.

2. The corresponding language JSON file is loaded dynamically from the /locales directory.

3. Components access translated strings via the useTranslation() hook from react-i18next.

4. When the user selects a new language, i18n.changeLanguage() is called and the choice is persisted in localStorage.

5. The app reloads the relevant translation file and automatically re-renders all components using useTranslation().

<br />

### Internationalization Setup

The app initializes react-i18next using a dedicated configuration file (i18n.ts):

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

#### Key Features of the i18n Setup

- **Separation of Code and Translations**

  Translations are stored in JSON files (en.json, ko.json, etc.) inside the /locales folder. Adding a new language requires only a new file with the same key structure.

- **Dynamic Language Loading**

  The i18next-http-backend plugin loads only the selected language file at runtime, reducing the initial bundle size and simplifying language management.

- **Persistent Language Selection**

  The selected language is stored in localStorage to maintain the user's preference across sessions.

- **Fallback Language**

  If a key is missing in the selected language, the app gracefully falls back to English (fallbackLng: "en"), ensuring the interface remains functional.

<br />
<br />

## Key Feature Implementations

<br />

### Fetching the Latest Country Data

This application retrieves real-time country data using the REST Countries API, with network state management handled by TanStack Query. Given the use of a public API, the implementation is optimized to reduce unnecessary API calls while maintaining a smooth and responsive user experience.

#### How Data Fetching Works

1. A fetchCountries query function is defined in the `<Main>` component.

2. This function is passed to `useQuery()` from TanStack Query to perform the asynchronous API call.

3. The returned values—data, isPending, and isError—are passed as props to the `<CountryTable>` component.

4. `<CountryTable>` renders its content based on the current request state:

   - Loading/Error: Displays loading or error messages.
   - Success: Renders the filtered and localized list of countries (not raw API output).

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

- `staleTime`: Infinity: Marks the data as perpetually fresh. The query will not re-fetch unless the app is reloaded.

- `refetchOnWindowFocus: false`: Prevents automatic re-fetching when the user switches back to the app tab.

- `refetchOnReconnect: false`: Disables re-fetching when the network connection is restored. Existing data is retained.

<br />

### Implementing Region and Status Filters

The `<Region>` and `<Status>` components handle user interactions for region and status-based filtering. When a user selects or deselects an option, these components update the shared filters state managed by the `<Main>` component.

The updated state is passed to a filtering utility function located at src/Main/helpers/filters.ts, which processes the logic to determine which countries should be displayed.

#### How Filtering Works

1. Extract Selected Options

   The helper function first inspects the filters state to determine which region and status options have been selected (i.e., those set to true). Only these active values are considered for filtering.

2. No Filters Selected

   If no region or status options are selected (i.e., all values are false), the function returns the unfiltered list of countries.

3. Apply Filters

   If any filters are selected, the function iterates through the list of countries and applies the following logic:

   - Region Filter: Includes countries where country.region matches one of the selected region keys.
   - Status Filter: Includes countries where the selected status keys (e.g., unMember, independent) exist in the country object and are true.

This filtering logic ensures that only countries matching all active criteria are included in the final display.

<br />

### Sorting Table Content by Language

When sorting data in a multilingual table, one critical factor to consider is language-specific sorting rules. In multilingual applications, switching the language should also affect how data—like country names or regions—is sorted to ensure a consistent user experience.

For example, if the app is set to Korean but country names are still being sorted alphabetically based on English names, users may find the behavior confusing and inconsistent.

To solve this, the application implements language-aware sorting using the following strategy.

#### Data Model for Sorting

Sorting is based on the LocalizedCountry type, which extends the original Country type (from the REST Countries API) by adding localized fields such as translated names and formatted numbers.

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

These localized fields are populated after data is fetched, using a helper function defined in `src/Main/helpers/localization.ts`.

#### Sorting Logic

Once the LocalizedCountry[] array is fully processed with localized content, it is passed to the sortCountries() function, which sorts the list based on the current filter settings:

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

- For text-based sorting (name and region), the function uses localeCompare() on the localized fields localizedName and localizedRegion to sort according to the selected language.

- For numeric sorting (population and area), the original values are used for sorting accuracy. However, the displayed values in the UI use the localized formats (localizedPopulation, localizedArea) to match the user’s locale.

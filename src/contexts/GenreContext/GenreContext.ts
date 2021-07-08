import { createContext } from "react";

import { Genre } from "types";

export const GenreContext = createContext<Genre[]>([]);

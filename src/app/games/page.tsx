// Set this page as a client page
"use client";
// Games Page Requirements
import { Image, Input } from "@/components";
import Select from "@/components/select";
import { FindGamesByFilters, FindTop100Games } from "@/lib/games";
import { FindAllGenres } from "@/lib/genres";
import { FindAllPlatforms } from "@/lib/platforms";
import { FindAllThemes } from "@/lib/themes";
import { MinimalGameResponse } from "@/lib/types";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
// Games Page Main Function
function GamesPage() {
  // Games Page Constants
  const GAME_SKELETON = {
    slug: "skeleton",
    cover: null,
  };
  const DEFAULT_VALUE = [{ name: "Seleccionar", value: `${0}` }];
  const gameSkeletonsList = Array(30).fill(GAME_SKELETON);
  // Games Page Hooks
  const [searchList, SetSearchList] =
    useState<{ slug: string; cover: string }[]>(gameSkeletonsList);
  const [formLists, SetFormLists] = useState<{
    themesList: {
      name: string;
      value: string;
    }[];
    genresList: {
      name: string;
      value: string;
    }[];
    platformsList: {
      name: string;
      value: string;
    }[];
  }>({
    themesList: DEFAULT_VALUE,
    genresList: DEFAULT_VALUE,
    platformsList: DEFAULT_VALUE,
  });
  const [top100List, SetTop100List] = useState<MinimalGameResponse[]>([]);
  // Execute this use effect when page is loading
  useEffect(() => {
    const GetData = async () => {
      // Get data from API
      const gamesList = await FindTop100Games();
      const themesList = await FindAllThemes();
      const genresList = await FindAllGenres();
      const platformsList = await FindAllPlatforms();
      // Set Top 100 List as Search List
      SetSearchList(
        gamesList.map((game) => ({
          slug: game.slug,
          cover: game.cover,
        }))
      );
      // Set Themes, Genres and Platforms in Selects
      SetFormLists({
        themesList: [
          ...DEFAULT_VALUE,
          ...themesList.map((theme) => ({
            name: theme.name,
            value: `${theme.id}`,
          })),
        ],
        genresList: [
          ...DEFAULT_VALUE,
          ...genresList.map((genre) => ({
            name: genre.name,
            value: `${genre.id}`,
          })),
        ],
        platformsList: [
          ...DEFAULT_VALUE,
          ...platformsList.map((platform) => ({
            name: platform.name,
            value: `${platform.id}`,
          })),
        ],
      });
      // Save Top 100 List when Reset
      SetTop100List(gamesList);
    };
    GetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Function that allows to set the new filtered list in search list
  const SearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Prevents the page reload
    event.preventDefault();
    // Get Form
    const FORM = event.target as HTMLFormElement;
    // Get all values from Form
    const NAME = FORM.gameName.value;
    const THEME = FORM.theme.value;
    const GENRE = FORM.genre.value;
    const PLATFORM = FORM.platform.value;
    // If each value has no valid value, return
    if (NAME == "" && THEME == 0 && GENRE == 0 && PLATFORM == 0) {
      return;
    }
    // Set Search List with Skeleton List
    SetSearchList(gameSkeletonsList);
    // Get a new search list filtered by name, theme, genre and platform from API 
    const newSearchList = await FindGamesByFilters(NAME, THEME, GENRE, PLATFORM);
    // Set new Search List
    SetSearchList(
      newSearchList.map((game) => ({
        slug: game.slug,
        cover: game.cover,
      }))
    );
  };
  // Function that allows to set the original top 100 games
  const ResetSearch = () => {
    SetSearchList(
      top100List.map((game) => ({
        slug: game.slug,
        cover: game.cover,
      }))
    );
  };
  // Returns Games Page
  return (
    // Games Page Main Container
    <div className="flex flex-col gap-6 px-7 py-7 justify-self-start lg:px-10">
      {/* Games Page Utilities Container */}
      <div className="flex flex-wrap place-content-center gap-5 min-[500px]:items-end min-[1734px]:place-content-between">
        {/* Games Page Utilities Container Section */}
        <section className="flex flex-col gap-5 text-center min-[1734px]:text-left">
          {/* Games Page Utilities Container Section Title */}
          <h1 className="text-4xl leading-none font-bold text-gray-300 min-[351px]:text-5xl">
            Juegos
          </h1>
          {/* Games Page Utilities Container Section Paragraph */}
          <p className="text-gray-300 min-[765px]:text-lg">
            Se muestran los top 100 mejores elementos relacionados a la búsqueda
          </p>
        </section>
        {/* Games Page Utilities Container Form Container */}
        <div className="w-full min-[765px]:w-auto">
          {/* Games Page Utilities Container Search Form */}
          <form
            className="flex flex-col gap-5 mx-auto min-[670px]:gap-3 min-[1100px]:flex-row"
            onSubmit={SearchSubmit}
          >
            {/* Game Name Input */}
            <Input
              label="Nombre"
              name="gameName"
              placeholder="Crash"
              validation="text"
              optional
            />
            <div className="flex flex-col gap-5 items-end min-[765px]:flex-row min-[765px]:gap-3">
              {/* Theme Select */}
              <Select
                label="Tema"
                name="theme"
                optionsList={formLists.themesList}
                restricWidth
              />
              {/* Genre Select */}
              <Select
                label="Género"
                name="genre"
                optionsList={formLists.genresList}
                restricWidth
              />
              {/* Platform Select */}
              <Select
                label="Plataforma"
                name="platform"
                optionsList={formLists.platformsList}
                restricWidth
              />
              {/* Form Buttons Container */}
              <div className="flex gap-3 w-full min-[765px]:w-fit">
                {/* Search Button */}
                <button className="h-fit w-full font-medium text-white bg-primary px-5 py-2.5 rounded-md cursor-pointer hover:bg-primary-light min-[765px]:w-auto">
                  Buscar
                </button>
                {/* Reset Button */}
                <button
                  className="h-fit w-full font-medium text-white bg-primary px-5 py-2.5 rounded-md cursor-pointer hover:bg-primary-light min-[765px]:w-auto"
                  type="button"
                  onClick={ResetSearch}
                >
                  Resetear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* Games Page Games Container */}
      <div className="flex flex-wrap gap-3 place-content-center">
        {/* If search list has 1 element, display it, if not, display a not found message */}
        {searchList.length > 0 ? (
          searchList.map((game, index) => (
            <Link
              key={index}
              href={game.slug !== "skeleton" ? `/games/${game.slug}` : ""}
              className="rounded-md w-[30%] min-[560px]:w-40"
            >
              <Image
                src={
                  game.cover !== null
                    ? `https://images.igdb.com/igdb/image/upload/t_original/${game.cover}`
                    : "/skeletons/cover.webp"
                }
                alt={`${game.slug} Cover`}
                skeleton="cover"
                width={180}
                height={280}
                priority
                className={`rounded-md ${
                  game.cover !== null ? "transition hover:scale-110" : ""
                }`.trimEnd()}
              />
            </Link>
          ))
        ) : (
          // Not Found Container
          <div className="text-center px-10 mt-10">
            {/* Not Found Code */}
            <span className="text-primary-light font-semibold mb-2 text-center">
              404
            </span>
            {/* Not Found information section */}
            <section className="flex flex-col gap-5 items-center">
              {/* Not Found Title */}
              <h1 className="text-gray-300 text-[2.5rem] leading-none font-bold min-[351px]:text-5xl min-[420px]:text-6xl">
                Contenido No Encontrado
              </h1>
              {/* Not Found Description */}
              <p>
                Lo sentimos, no se pudo encontrar el contenido que está
                buscando.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default GamesPage;

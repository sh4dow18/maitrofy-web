// Set this page as a client page
"use client";
// Specific Backlog Page Requirements
import {
  DateInput,
  Form,
  GameOverview,
  Input,
  NotFound,
  Textarea,
} from "@/components";
import Select from "@/components/select";
import { FindAllAchievements } from "@/lib/achievements";
import { API } from "@/lib/admin";
import { FindAllGamePlatforms } from "@/lib/platforms";
import { GetJWT, RemoveJWT } from "@/lib/session";
import { GameLogResponse } from "@/lib/types";
import { FindUserGameLog } from "@/lib/users";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
// Specific Backlog Page Main Function
function BacklogOverviewPage() {
  // Specific Backlog Page Constants
  const PARAMS = useParams();
  const SLUG = typeof PARAMS.slug === "string" ? PARAMS.slug : "";
  const DEFAULT_SELECT = { name: "Seleccionar", value: "null" };
  // Specific Backlog Page Hooks
  const [log, SetLog] = useState<GameLogResponse>({
    slug: "loading",
    rating: null,
    date: "--/--/----",
    review: null,
    hoursSpend: null,
    game: {
      slug: "loading",
      name: "Cargando",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum tellus sit amet varius luctus. Cras ac arcu ipsum. Maecenas viverra sem at vehicula vulputate. Suspendisse eget tincidunt nibh, id laoreet ipsum. Integer enim lacus, faucibus ut sapien id, commodo feugiat turpis. Nulla venenatis placerat lacus, ut commodo diam euismod a. In convallis tristique sapien nec fermentum. In hac habitasse platea dictumst. Cras feugiat sed tortor sit amet venenatis. Vivamus vel neque quam. Pellentesque dolor risus, blandit eget aliquam a, mattis id augue.",
      cover: "null",
      background: "null",
      rating: 0.0,
      classification: "-",
      year: 0,
      video: "-",
      collection: "Cargando...",
      developer: "Cargando...",
      gameMode: "Cargando...",
      themes: "-",
      genres: "-",
      platforms: "-",
    },
    platform: null,
    achievement: null,
  });
  const [formLists, SetFormsList] = useState<{
    achievementsList: { name: string; value: string }[];
    platformsList: { name: string; value: string }[];
  }>({
    achievementsList: [DEFAULT_SELECT],
    platformsList: [DEFAULT_SELECT],
  });
  // Execute this use effect when page is loading to find the user game log
  useEffect(() => {
    const GetData = async () => {
      // Try to find a Specific User Game Log from API
      const RESPONSE = await FindUserGameLog(SLUG);
      // If Status exists in Response, that is Error Response, so, return to login and remove JWT
      if ("status" in RESPONSE) {
        RemoveJWT();
        window.location.href = "/login";
        return;
      }
      // Set the Game Log
      SetLog(RESPONSE);
      // Find all Achievements from API
      const ACHIEVEMENTS_RESPONSE = await FindAllAchievements();
      // Find all Game Platforms from API
      const PLATFORMS_RESPONSE = await FindAllGamePlatforms(SLUG);
      // Set Achivements and Platforms to use in Selects
      SetFormsList({
        achievementsList: !("status" in ACHIEVEMENTS_RESPONSE)
          ? [
              DEFAULT_SELECT,
              ...ACHIEVEMENTS_RESPONSE.map((achievement) => ({
                name: achievement.name,
                value: `${achievement.id}`,
              })),
            ]
          : [DEFAULT_SELECT],
        platformsList: !("status" in PLATFORMS_RESPONSE)
          ? [
              DEFAULT_SELECT,
              ...PLATFORMS_RESPONSE.map((platform) => ({
                name: platform.name,
                value: `${platform.id}`,
              })),
            ]
          : [DEFAULT_SELECT],
      });
    };
    GetData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SLUG]);
  // Form On Submit Function to Update Game Log
  const OnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Get all data from Form
    const FORM = event.target as HTMLFormElement;
    const RATING = FORM.rating.value;
    const DATE = FORM.date.value;
    const REVIEW = FORM.review.value;
    const TIME_SPEND = FORM.timeSpend.value;
    const PLATFORM = FORM.platform.value;
    const ACHIEVEMENT = FORM.achievement.value;
    // Creates Body from Form Data
    const BODY = {
      game: SLUG,
      rating: RATING !== "" ? Number.parseInt(RATING) : null,
      date: DATE !== "" ? new Date(FORM.date.value).getTime() : null,
      review: REVIEW !== "" ? FORM.review.value : null,
      hoursSpend: TIME_SPEND !== "" ? Number.parseInt(TIME_SPEND) : null,
      platform: PLATFORM !== "null" ? Number.parseInt(PLATFORM) : null,
      achievement: ACHIEVEMENT !== "null" ? Number.parseInt(ACHIEVEMENT) : null,
      updateAll: FORM.updateAll.value === "yes",
    };
    // Update Game Log in API
    return await fetch(`${API}/gameLogs/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GetJWT()}`,
      },
      body: JSON.stringify(BODY),
    });
  };
  // Returns Specific Backlog Page
  return log !== null ? (
    // Specific Backlog Page Main Container
    <div className="flex flex-col gap-6 p-10 max-w-4xl min-[897px]:mx-auto">
      {/* Specific Backlog Page Game Log */}
      <GameOverview
        title={log.game.name}
        cover={log.game.cover}
        background={log.game.background}
        date={log.game.year}
        themes={log.game.themes}
        genres={log.game.genres}
        platforms={log.game.platforms}
        overview={log.game.summary}
        rating={log.game.rating}
        classification={log.game.classification}
        developer={log.game.developer}
        gameMode={log.game.gameMode}
        trailer={log.game.video}
        slug={log.game.slug}
        log={{
          achievement:
            log.achievement != null
              ? {
                  name: log.achievement.name,
                  value: log.achievement.points,
                  logo: log.achievement.logo,
                }
              : null,
          platform: log.platform,
          rating: log.rating,
          date: log.date,
          note: log.review,
          time: log.hoursSpend,
        }}
      />
      {/* Specific Backlog Page Update Section  */}
      <h2 className="font-semibold text-xl text-gray-300 md:text-2xl">
        {`Actualizar Registro del Juego "${log.game.name}"`}
      </h2>
      {/* Specific Backlog Page Update Form  */}
      <Form
        submitButton="Actualizar Registro"
        OnSubmit={OnSubmit}
        messages={{
          loading: "Actualizando Registro...",
          success: `Se ha actualizado el Registro del Juego '${log.game.name}'`,
        }}
        AfterSubmit={() => {
          location.reload();
        }}
      >
        <div className="flex flex-col gap-3 min-[530px]:grid min-[530px]:grid-cols-3">
          {/* Achievement Select */}
          <Select
            label="Logro"
            name="achievement"
            optionsList={formLists.achievementsList}
            help="Logro conseguido dentro de los que existen"
          />
          {/* Platform Select */}
          <Select
            label="Plataforma"
            name="platform"
            optionsList={formLists.platformsList}
            help="Plataforma en la que se juega o jugó de las plataformas que soporta"
          />
          {/* Date Input */}
          <DateInput
            label="Registrado"
            name="date"
            help="Fecha en la cual fue registrado el registro de juego o logro"
            optional
          />
        </div>
        <div className="flex flex-col gap-3 min-[530px]:grid min-[530px]:grid-cols-3">
          {/* Rating Input */}
          <Input
            label="Valoración"
            name="rating"
            validation="1to10"
            placeholder="7"
            help="Cantidad de Estrellas del 1 al 10 que puede tener el juego"
            optional
          />
          {/* Time Spend Input */}
          <Input
            label="Tiempo"
            name="timeSpend"
            validation="int"
            placeholder="55"
            help="Tiempo en horas que se han invertido en el juego"
            optional
          />
          {/* Update All Select */}
          <Select
            label="Actualizar Todo"
            name="updateAll"
            optionsList={[
              { name: "No", value: "no" },
              { name: "Sí", value: "yes" },
            ]}
            help="Si se actualiza todo, lo no enviado es nulo, si no, no se actualiza"
          />
        </div>
        {/* Review Textarea */}
        <Textarea
          label="Reseña"
          name="review"
          help="Reseña del Juego"
          placeholder="Es un buen juego, bastante pintorezco, es un juego sencillo, pero muy disfrutable. No es un juego largo, es para pasar el rato tranquilamente. No es el mejor juego de plataformas, pero no pretende serlo, es un juego simple, tanto de entender como de jugar, con una linda historia. Los controles están muy bien hechos y tiene buenas peleas con jefes, todas diferentes, lo cual lo hace entretenido y memorable. Es un buen juego, lo suficiente como para poder querer conseguir su platino y recordarlo con cariño."
          optional
          maxLength={1000}
        />
      </Form>
    </div>
  ) : (
    <NotFound
      backTo={{
        name: "Mi Trayectoria",
        href: "/backlog",
      }}
    />
  );
}

export default BacklogOverviewPage;

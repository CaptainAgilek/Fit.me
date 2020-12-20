import { placesByCityIds, allPlaceIds } from '../place/query';

export const actionsForPlace = async (_, { place_id }, { dbConnection }) => {
  if (!place_id) {
    return [];
  }
  const result = await dbConnection.query(
    `SELECT * FROM action
      WHERE place_id = ?`,
    [place_id],
  );
  return result;
};

export const filteredActions = async (_, { filter }, { dbConnection }) => {
  // TODO kontrola vstupu - aka nemelo by byt posilany pro vsechny mista, ve vsechny casy, pro vsechny sporty, ...

  // get places
  const placeIds = (await filter.city)
    ? await placesByCityIds(_, { city: filter.city }, { dbConnection })
    : await allPlaceIds(_, _, { dbConnection });

  // get all actions in selected places
  const actions = await actionsForPlaceIds(
    _,
    {
      place_ids: placeIds,
      date: filter.date ? filter.date : new Date(),
      hourStart: filter.hourStart ? filter.hourStart : '00',
      hourEnd: filter.hourEnd ? filter.hourEnd : '23',
      category: filter.category,
    },
    { dbConnection },
  );

  return actions;
};

const actionsForPlaceIds = async (
  _,
  { place_ids, date, hourStart, hourEnd, category },
  { dbConnection },
) => {
  // TODO: USE CATEGORY (MISSING IN DB)
  var actions = [];

  for (const id of place_ids) {
    const result = await dbConnection.query(
      `SELECT * FROM action
        WHERE place_id = ? AND date = ? AND time>= ? AND time <= ?`,
      [id.place_id, date, hourStart, hourEnd],
    );
    actions = [...result];
  }

  return actions;
};

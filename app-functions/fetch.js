const timeOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  timeZone: "UTC",
  timeZoneName: "short",
  month: "numeric",
  day: "numeric",
  year: "numeric",
};

export const DATE = new Intl.DateTimeFormat("en-US", timeOptions).format(
  new Date(),
);

export const deleteUserLog = async (accessToken, userLog) => {
  const request = new Request("/u/delete/log", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userLog: userLog,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: deleteUserLog() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const fetchUserLog = async (accessToken) => {
  const request = new Request("/u/fetch/log", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: fetchUserLog() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const trackUserRecipe = async (accessToken, datestamp, recipe) => {
  const request = new Request("/u/track/recipe", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      datestamp: datestamp,
      recipe: recipe,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: trackUserRecipe() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const fetchIngredientAnalysis = async (accessToken, ingredients) => {
  const request = new Request("/u/fetch/analysis", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: fetchIngredientAnalysis() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const fetchIngredientSearch = async (accessToken, searchCriteria) => {
  const request = new Request("/u/fetch/search", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchCriteria: searchCriteria,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: fetchIngredientSearch() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const saveUserMenu = async (accessToken, menu) => {
  const request = new Request("/u/save/menu", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      menu: menu,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: saveUserMenu() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const fetchUserMenu = async (accessToken) => {
  const request = new Request("/u/fetch/menu", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${response.url} calling: fetchUserMenu() ${DATE}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
};

export const saveUserDetails = async (accessToken, details) => {
  const request = new Request("/u/save/details", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      details: details,
    }),
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! function: saveUserDetails(), request: /u/save/details, timestamp: ${DATE} 
        ${response.status} ${response.statusText} ${response.url}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
}; // UPDATED!

export const fetchUserStatus = async (accessToken) => {
  const request = new Request("/u/user/status", {
    method: "POST",
    headers: {
      "Token-Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(
        `HTTP error! function: fetchUserStatus(), request: /u/user/status, timestamp: ${DATE} 
        ${response.status} ${response.statusText} ${response.url}`,
      );
    }
    return await response.json();
  } catch (error) {
    console.info(error);
    return { error: error };
  }
}; // UPDATED!

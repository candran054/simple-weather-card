await fetch(
  `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_KEY}`
    .then((res) => res.json())
    .then((result) => {
      setData(result);
      console.log(result);
    })
);

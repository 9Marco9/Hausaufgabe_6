import { Grid2, Typography, TextField, MenuItem, Button } from "@mui/material";

import { useState } from "react";

function Koordinatentransformation() {
  const [dienst, setDienst] = useState("");
  const [easting, setEasting] = useState("");
  const [northing, setNorthing] = useState("");
  const [transformierteX, setTransformierteX] = useState("");
  const [transformierteY, setTransformierteY] = useState("");
  const [fehler, setFehler] = useState(null);

  const handleTransformation = async () => {
    if (!easting || !northing) {
      setFehler("Bitte Easting und Northing Koordinaten angeben.");
      return;
    }

    const endpoint =
      dienst === "LV95 to WGS84"
        ? `http://geodesy.geo.admin.ch/reframe/lv95towgs84`
        : `http://geodesy.geo.admin.ch/reframe/wgs84tolv95`;

    const variablenURL = new URLSearchParams({
      easting,
      northing,
      format: "json",
    });
    console.log(`${endpoint}?${variablenURL.toString()}`);
    try {
      const response = await fetch(`${endpoint}?${variablenURL.toString()}`);

      if (!response.ok) {
        throw new Error(
          "Transformationsfehler: Bitte überprüfen Sie die Eingaben."
        );
      }

      const data = await response.json();

      setTransformierteX(data.easting || data.coordinates[0]);
      setTransformierteY(data.northing || data.coordinates[1]);
    } catch (err) {
      setFehler(err.message);
    }
  };

  return (
    <Grid2
      container
      direction="column"
      spacing={2}
      alignItems="center"
      sx={{ mt: 4 }}
    >
      <Grid2 titel>
        <Typography variant="h4">Koordinatentransformation</Typography>
      </Grid2>

      <Grid2 item>
        <TextField
          select
          label="REFRAME Dienst"
          value={dienst}
          onChange={(e) => setDienst(e.target.value)}
          variant="outlined"
          sx={{ width: 300 }}
        >
          <MenuItem value="LV95 to WGS84">LV95 to WGS84</MenuItem>
          <MenuItem value="WGS84 to LV95">WGS84 to LV95</MenuItem>
        </TextField>
      </Grid2>

      <Grid2 TextField1>
        <TextField
          label="Easting"
          variant="outlined"
          value={easting}
          onChange={(e) => setEasting(e.target.value)}
          sx={{ width: 300 }}
        />
      </Grid2>

      <Grid2 TextField2>
        <TextField
          label="Northing"
          variant="outlined"
          value={northing}
          onChange={(e) => setNorthing(e.target.value)}
          sx={{ width: 300 }}
        />
      </Grid2>

      <Grid2 Button>
        <Button variant="contained" onClick={handleTransformation}>
          Transformation
        </Button>
      </Grid2>

      {fehler && (
        <Grid2 item>
          <Typography color="error">{fehler}</Typography>
        </Grid2>
      )}

      <Grid2 TextField3>
        <TextField
          label="Transformierte X-Koordinate"
          variant="outlined"
          value={transformierteX}
          sx={{ width: 300 }}
        />
      </Grid2>

      <Grid2 TextField4>
        <TextField
          label="Transformierte Y-Koordinate"
          variant="outlined"
          value={transformierteY}
          sx={{ width: 300 }}
        />
      </Grid2>
    </Grid2>
  );
}

export default Koordinatentransformation;

import { render, act} from "@testing-library/react";
import InfoWindow from "../../components/map/InfoWindow";


test('check info window data is rendered correctly', async () => {


  await act(async () => {    

    const infoWindowData= {
        title: "Test title",
        id: "",
        latitude: 0,
        longitude: 0
    }
    const {container, getByText} = render(<InfoWindow infoWindowData={infoWindowData} /> )  
    expect(await getByText("Test title")).toBeInTheDocument();
  });
  
  
})


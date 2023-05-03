import { render, act, waitFor, queryAllByText, getAllByText} from "@testing-library/react";
import { FAQ } from "../../components/mainPage/FAQ";


test('check faq view is rendered correctly', async () => {

  await act(async () => {    
    const {container, getByText} = render(
        <FAQ/>  
    ) 

    expect(getByText("Frequently asked questions")).toBeInTheDocument();
    expect(getByText("How do I add a place?")).toBeInTheDocument();
  });  
})

import { mount } from "@vue/test-utils";
import Search from "@/components/Search.vue";

const repos = ["repoA", "repoB", "repoZ", "value1"];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(repos)
  })
);

describe("Search.vue", () => {
  it("Changing the input - change component value prop", () => {
    const wrapper = mount(Search);
    expect(wrapper.vm.value).toBe("");
  });
});

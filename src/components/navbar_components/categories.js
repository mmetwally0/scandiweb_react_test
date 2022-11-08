import React from "react";

import { ALL_CATEGORIES } from "../queries";
import { Query } from "@apollo/client/react/components";

class Categories extends React.Component {
  render() {
    const { handleCategoryChange } = this.props;

    return (
      <Query query={ALL_CATEGORIES}>
        {({ loading, data }) => {
          // Wait until data is fetched before rendering anything
          if (loading) return null;

          return (
            <ul className="category-links">
              {data.categories.map((category) => (
                <li
                  key={category.name}
                  onClick={() => {
                    handleCategoryChange(category.name);
                  }}
                  className={
                    this.props.category === category.name ? "active" : ""
                  }
                >
                  {category.name}
                </li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}

export default Categories;

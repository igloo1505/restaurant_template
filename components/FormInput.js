import React, { useState, useEffect } from "react";
import styles from "../styles/PortalLeftTab.module.scss";
import { connect, useDispatch } from "react-redux";
import { SET_FORM_DATA } from "../stateManagement/TYPES";

const FormInput = ({
  props: {
    k,
    setFormData,
    formData,
    selected,
    selectedItem,
    setSelectedItem,
    hasNestedCategories,
  },
  viewport: { isTablet, isMobile, isDesktop },
  UI: {
    isEditing,
    form: { as: currentSubCategory, data: appWideFormData },
  },
}) => {
  const dispatch = useDispatch();
  const [booleanToggle, setBooleanToggle] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (isEditing) {
      setBooleanToggle(selectedItem[k.display]);
    }
    if (!isEditing) {
      setBooleanToggle(false);
    }
  }, [isEditing, selectedItem]);
  useEffect(() => {
    if (isEditing) {
      return selectedItem[k.display];
    }
    if (!isEditing) {
      // debugger;
      setInputValue(appWideFormData[selected.name][k.display]);
      return appWideFormData[selected.name][k.display];
    }
  }, [selected.name, isEditing, appWideFormData, currentSubCategory]);
  const handleChange = (value) => {
    if (!isEditing) {
      // setFormData({
      //   ...formData,
      //   [selected.name]: {
      //     ...formData[selected.name],
      //     [k.display]: value,
      //   },
      // });
      dispatch({
        type: SET_FORM_DATA,
        payload: {
          selectedName: selected.name,
          isSubCategory: hasNestedCategories ? true : false,
          display: k.display,
          value: value,
        },
      });
    }
    if (isEditing) {
      setSelectedItem({ ...selectedItem, [k.display]: value });
    }
  };

  // TODO Add form validation on frontend to check password confirmation and validate password and email fields. Consider adding other fields for phone number and email.

  switch (k.type) {
    case "string":
      return (
        <div className="mb-3" id={`${selected.name}Dot${k.display}`}>
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "textArea":
      return (
        <div className="mb-3" id={`${selected.name}Dot${k.display}`}>
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <textarea
            class="form-control"
            aria-label="With textarea"
            style={{ height: "115px" }}
            onChange={(e) => handleChange(e.target.value)}
            value={inputValue}
          ></textarea>
        </div>
      );
    case "password":
      return (
        <div className="mb-3" id={`${selected.name}Dot${k.display}`}>
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="password"
            className="form-control"
            aria-describedby="emailHelp"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
    case "boolean":
      // TODO check with using booleanValue in state if this causes an error inserting a string temporarily into a boolean switch value.
      return (
        <div
          className="mb-1 form-check form-switch"
          id={`${selected.name}Dot${k.display}`}
        >
          <input
            type="checkbox"
            className="form-check-input"
            value={inputValue}
            onChange={(e) => {
              handleChange(!booleanToggle);
              setBooleanToggle(!booleanToggle);
            }}
            checked={booleanToggle}
          />
          <label className="form-check-label" for={k.display}>
            {k.display}
          </label>
        </div>
      );
    case "select":
      const returnValue = () => {
        if (isEditing && !hasNestedCategories) {
          return selectedItem[k.display];
        }
        if (!isEditing) {
          return appWideFormData[selected.name][k.display];
        }
      };
      return (
        <div className="mb-3" id={`${selected.name}Dot${k.display}`}>
          <label className="form-check-label" for={k.display}>
            {k.display}
          </label>
          <select
            className="form-select form-select-sm"
            aria-label="Category"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          >
            <option selected>{k.display}</option>
            {k.dataSet.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>
        </div>
      );
    case "number":
      return (
        <div className="mb-3" id={`${selected.name}Dot${k.display}`}>
          <label for={k.display} className="form-label">
            {k.display}
          </label>
          <input
            type="number"
            className="form-control"
            aria-describedby="emailHelp"
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      );
  }
  return <div style={{ border: "2px solid red" }}>{k.display}</div>;
};

const mapStateToProps = (state, props) => ({
  UI: state.UI,
  viewport: state.UI.viewport,
  props: props,
});

export default connect(mapStateToProps)(FormInput);

// <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>

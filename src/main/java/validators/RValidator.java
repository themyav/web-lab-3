package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("rValidator")
public class RValidator implements Validator {

    private double R;
    void setError(){
        FacesMessage msg = new FacesMessage("Incorrect Y val");
        msg.setSeverity(FacesMessage.SEVERITY_ERROR);
        throw new ValidatorException(msg);
    }

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        if (o == null) setError();
        else {
            try {
                R = Double.parseDouble(o.toString());
            } catch (NumberFormatException e) {
                setError();
            }
            if (R != 1 && R != 1.5 && R != 2 && R != 2.5 && R != 3) setError();
        }
    }
}

package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("xValidator")
public class XValidator implements Validator {

    private double X;
    void setError(){
        FacesMessage msg = new FacesMessage("Incorrect X val");
        msg.setSeverity(FacesMessage.SEVERITY_ERROR);
        throw new ValidatorException(msg);
    }

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        if(o == null) setError();
        else{
            try{
                X = Double.parseDouble(o.toString().replace(",", "."));
            }
            catch (NumberFormatException e){
                setError();
            }
            if(X < -5 || X > 5) setError();
        }

    }
}

package managedBeans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.util.Objects;

@ManagedBean(name ="areaCheck")
public class AreaCheck implements Serializable{
    private static final long serialVersionUID = 1L;
    private String x, y, r;
    private boolean result;


    public String getCheckArea(){
        return Objects.equals(x, "1") ? "OKey " + x + " " + y + " " + r : "NOT OK" + x + " " + y + " " + r;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }


    public void setResult(boolean result) {
        this.result = result;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }

    public void setR(String r) {
        this.r = r;
    }
}

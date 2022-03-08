package com.example.ISISCapitalistJuliagathe;

import com.example.ISISCapitalistJuliagathe.world.World;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

public class Services {
    World readWorldFromXml(String pseudo){
        World w= null;
        InputStream input =
                getClass().getClassLoader().getResourceAsStream(pseudo+"-world.xml");
        if (input==null)
             input =getClass().getClassLoader().getResourceAsStream("world.xml");
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            w= (World)u.unmarshal(input);
            //System.out.println(w.getName());
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return w;
    }

    void saveWorldToXml(World world, String pseudo){
        try {
            OutputStream output = new FileOutputStream(new File(pseudo+"-world.xml"));
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Marshaller m = cont.createMarshaller();
            m.marshal(world, output);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    World getWorld(String pseudo){
        return readWorldFromXml(pseudo);
    }

}

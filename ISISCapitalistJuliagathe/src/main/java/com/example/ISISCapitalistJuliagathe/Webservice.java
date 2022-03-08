package com.example.ISISCapitalistJuliagathe;

import com.example.ISISCapitalistJuliagathe.world.ProductType;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.springframework.web.bind.annotation.RequestHeader;

@Path("generic")
public class Webservice {
    Services services;
    public Webservice() {
        services = new Services();
    }
    @GET
    @Path("world")
    @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
    public Response getWorld(@RequestHeader(value = "X-User", required = false) String username) {
        return Response.ok(services.getWorld(username)).build();
    }
    
   /* @PUT
    @Path("product")
    @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
    public void putProduct(@RequestHeader(value = "X-User", required = false) String username, @RequestHeader(value = "X-Product", required = false) ProductType product) {
       // return Response.ok(s)).build();
    }*/
}

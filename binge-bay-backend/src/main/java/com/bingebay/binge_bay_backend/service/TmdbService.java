package com.bingebay.binge_bay_backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Map;

@Service
public class TmdbService {

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.api.base-url}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    private String buildUrl(String path, Map<String, String> params) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(baseUrl + path)
                .queryParam("api_key", apiKey);
        if (params != null) {
            params.forEach(builder::queryParam);
        }
        return builder.toUriString();
    }

    public Map getTrendingMovies(String timeWindow) {
        return restTemplate.getForObject(buildUrl("/trending/movie/" + timeWindow, null), Map.class);
    }

    public Map getPopularMovies(int page) {
        return restTemplate.getForObject(buildUrl("/movie/popular", Map.of("page", String.valueOf(page))), Map.class);
    }

    public Map getTopRatedMovies(int page) {
        return restTemplate.getForObject(buildUrl("/movie/top_rated", Map.of("page", String.valueOf(page))), Map.class);
    }

    public Map getNowPlayingMovies(int page) {
        return restTemplate.getForObject(buildUrl("/movie/now_playing", Map.of("page", String.valueOf(page))), Map.class);
    }

    public Map getMovieDetails(Long movieId) {
        return restTemplate.getForObject(buildUrl("/movie/" + movieId, null), Map.class);
    }

    public Map getMovieTrailers(Long movieId) {
        return restTemplate.getForObject(buildUrl("/movie/" + movieId + "/videos", null), Map.class);
    }

    public Map searchMovies(String query, int page) {
        return restTemplate.getForObject(
                buildUrl("/search/movie", Map.of("query", query, "page", String.valueOf(page))), Map.class);
    }

    public Map getMoviesByGenre(int genreId, int page) {
        return restTemplate.getForObject(
                buildUrl("/discover/movie", Map.of("with_genres", String.valueOf(genreId), "page", String.valueOf(page))), Map.class);
    }

    public Map getGenres() {
        return restTemplate.getForObject(buildUrl("/genre/movie/list", null), Map.class);
    }

    public Map getSimilarMovies(Long movieId) {
        return restTemplate.getForObject(buildUrl("/movie/" + movieId + "/similar", null), Map.class);
    }
}
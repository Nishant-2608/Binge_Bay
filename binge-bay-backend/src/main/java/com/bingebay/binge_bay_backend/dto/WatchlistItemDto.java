package com.bingebay.binge_bay_backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class WatchlistItemDto {

    @NotNull(message = "TMDB Movie ID is required")
    private Long tmdbMovieId;

    @NotNull(message = "Movie title is required")
    private String movieTitle;

    private String posterPath;
    private String releaseDate;
    private Double voteAverage;
    private String overview;
}
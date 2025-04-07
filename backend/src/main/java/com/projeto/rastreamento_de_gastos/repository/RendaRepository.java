package com.projeto.rastreamento_de_gastos.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.rastreamento_de_gastos.entity.Renda;

@Repository
public interface RendaRepository extends JpaRepository<Renda, Long> {

    List<Renda> findByUsuarioIdAndDataBetween(Long usuarioId, LocalDate dataInicial, LocalDate dataFinal);

    List<Renda> findByUsuarioId(Long usuarioId);
    Optional<Renda> findFirstByUsuarioIdOrderByDataDesc(Long usuarioId);

    @Query("SELECT SUM(r.valor) FROM Renda r WHERE r.usuario.id = :usuarioId")
    public Double somarValorTotalPorUsuario(@Param("usuarioId") Long usuarioId);



}
